package com.declspecl.dependencies.s3;

import com.declspecl.converter.FormattedDate;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
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

    public Optional<String> fetchPersonaFromS3(FormattedDate formattedDate) {
        ResponseInputStream<GetObjectResponse> response = s3Client.getObject(getObjectRequest(formattedDate.value()));

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(response))) {
            return Optional.of(reader.readLine());
        }
        catch (IOException e) {
            log.error("Failed to fetch persona object from s3 for date {}", formattedDate.value(), e);
            return Optional.empty();
        }
    }

    public void putPersonaObjectToS3(FormattedDate formattedDate, String personaName) {
        s3Client.putObject(getPutObjectRequestForDate(formattedDate), RequestBody.fromString(personaName));
    }

    private PutObjectRequest getPutObjectRequestForDate(FormattedDate formattedDate) {
        return PutObjectRequest.builder()
                .bucket(bucketName)
                .key(formattedDate.value())
                .build();
    }

    private GetObjectRequest getObjectRequestForDate(FormattedDate formattedDate) {
        return getObjectRequest(formattedDate.value());
    }

    private GetObjectRequest getObjectRequest(String key) {
        return GetObjectRequest.builder()
                .key(key)
                .bucket(bucketName)
                .build();
    }
}
