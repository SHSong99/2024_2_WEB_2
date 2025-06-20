package wap.web2.server.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wap.web2.server.project.entity.Image;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {
    private String imageFile;

    // 스트림의 각 요소가 imageDto 인스턴스가 아니므로(String)
    // static 으로 선언해야 따로 객체생성 없이 바로 메서드 사용 가능
    public static Image toEntity(String imageFile) {
        return Image.builder()
                .imageFile(imageFile)
                .build();
    }

    // Image Entity를 ImageDto로 변환하는 정적 팩토리 메서드
    public static ImageDto from(Image image) {
        return ImageDto.builder()
            .imageFile(image.getImageFile())
            .build();
    }
}
