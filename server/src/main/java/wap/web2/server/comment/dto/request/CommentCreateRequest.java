package wap.web2.server.comment.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wap.web2.server.comment.entity.Comment;
import wap.web2.server.member.entity.User;
import wap.web2.server.project.entity.Project;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentCreateRequest {

    private String commentContent;
    private String commenter;
    private String password;

    public Comment toEntity(Project project, User user) {
        return Comment.builder()
                .commentContent(commentContent)
                .commenter(commenter)
                .password(password)
                .project(project)
                .user(user)
                .build();
    }
}
