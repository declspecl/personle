package com.declspecl.dependencies.s3;

import com.declspecl.converter.FormattedDate;
import com.declspecl.model.PersonaName;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Optional;

@Log4j2
@Component
public class DailyPersonaS3Adapter {
    private final String bucketName;
    private final S3Client s3Client;

    public DailyPersonaS3Adapter(
            S3Client s3Client,
            @Value("${aws.s3.dailyPersonas.bucketName}") String bucketName
    ) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
    }

    public Optional<PersonaName> fetchPersonaForDay(FormattedDate formattedDate) {
        ResponseInputStream<GetObjectResponse> response;
        try {
            response = s3Client.getObject(buildGetObjectRequest(formattedDate.date()));
        }
        catch (NoSuchKeyException e) {
            return Optional.empty();
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(response))) {
            return Optional.of(reader.readLine()).map(PersonaName::new);
        }
        catch (IOException e) {
            log.error("Failed to fetch persona object from s3 for date {}", formattedDate.date(), e);
            return Optional.empty();
        }
    }

    public void putPersonaObjectToS3(FormattedDate formattedDate, PersonaName personaName) {
        s3Client.putObject(buildPutObjectRequestForDate(formattedDate), RequestBody.fromString(personaName.persona()));
    }

    private PutObjectRequest buildPutObjectRequestForDate(FormattedDate formattedDate) {
        return PutObjectRequest.builder()
                .bucket(bucketName)
                .key(formattedDate.date())
                .build();
    }

    private GetObjectRequest buildGetObjectRequestForDate(FormattedDate formattedDate) {
        return buildGetObjectRequest(formattedDate.date());
    }

    private GetObjectRequest buildGetObjectRequest(String key) {
        return GetObjectRequest.builder()
                .key(key)
                .bucket(bucketName)
                .build();
    }
}
