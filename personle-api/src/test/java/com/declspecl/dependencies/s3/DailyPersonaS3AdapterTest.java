package com.declspecl.dependencies.s3;

import com.declspecl.converter.FormattedDate;
import com.declspecl.model.PersonaName;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DailyPersonaS3AdapterTest {
    @Mock
    private S3Client s3Client;
    private DailyPersonaS3Adapter dailyPersonaS3Adapter;

    private static final String BUCKET_NAME = "src/test/resources/";
    private static final FormattedDate TEST_FORMATTED_DATE = new FormattedDate("2024-01-01");

    @BeforeEach
    public void setup() {
        dailyPersonaS3Adapter = new DailyPersonaS3Adapter(s3Client, BUCKET_NAME);
    }

    @Test
    public void returnsEmptyForNonExistentPersonaObject() {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .key(TEST_FORMATTED_DATE.date())
                .bucket(BUCKET_NAME)
                .build();

        when(s3Client.getObject(getObjectRequest)).thenThrow(NoSuchKeyException.class);

        Optional<PersonaName> personaName = dailyPersonaS3Adapter.fetchPersonaForDay(TEST_FORMATTED_DATE);

        assertTrue(personaName.isEmpty());
        verify(s3Client).getObject(getObjectRequest);
    }

    @Test
    public void returnsEmptyWhenIoExceptionIsThrown() throws IOException {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .key(TEST_FORMATTED_DATE.date())
                .bucket(BUCKET_NAME)
                .build();

        InputStream fileInputStream = FileInputStream.nullInputStream();
        fileInputStream.close();

        when(s3Client.getObject(getObjectRequest)).thenReturn(
                new ResponseInputStream<>(GetObjectResponse.builder().build(), fileInputStream)
        );

        Optional<PersonaName> personaName = dailyPersonaS3Adapter.fetchPersonaForDay(TEST_FORMATTED_DATE);

        assertEquals(personaName, Optional.empty());
        verify(s3Client).getObject(getObjectRequest);
    }

    @Test
    public void fetchesPersonaForDay() throws IOException {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .key(TEST_FORMATTED_DATE.date())
                .bucket(BUCKET_NAME)
                .build();

        when(s3Client.getObject(getObjectRequest)).thenReturn(
                new ResponseInputStream<>(GetObjectResponse.builder().build(), new FileInputStream(BUCKET_NAME + TEST_FORMATTED_DATE.date()))
        );

        Optional<PersonaName> personaName = dailyPersonaS3Adapter.fetchPersonaForDay(TEST_FORMATTED_DATE);

        assertEquals(personaName, Optional.of(new PersonaName("Titania")));
        verify(s3Client).getObject(getObjectRequest);
    }

    @Test
    public void putsPersonaObjectToS3() throws IOException {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(BUCKET_NAME)
                .key(TEST_FORMATTED_DATE.date())
                .build();

        dailyPersonaS3Adapter.putPersonaObjectToS3(TEST_FORMATTED_DATE, new PersonaName("Titania"));

        ArgumentCaptor<RequestBody> captor = ArgumentCaptor.forClass(RequestBody.class);

        verify(s3Client).putObject(eq(putObjectRequest), captor.capture());

        try (InputStream inputStream = captor.getValue().contentStreamProvider().newStream()) {
            assertEquals(new String(inputStream.readAllBytes()), "Titania");
        }
    }
}
