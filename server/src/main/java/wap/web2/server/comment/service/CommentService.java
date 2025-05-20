package wap.web2.server.comment.service;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wap.web2.server.comment.dto.request.CommentCreateRequest;
import wap.web2.server.comment.dto.request.CommentDeleteRequest;
import wap.web2.server.comment.entity.Comment;
import wap.web2.server.comment.repository.CommentRepository;
import wap.web2.server.ouath2.security.UserPrincipal;
import wap.web2.server.project.entity.Project;
import wap.web2.server.project.repository.ProjectRepository;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ProjectRepository projectRepository;

    @Transactional
    public void save(Long projectId, CommentCreateRequest request, UserPrincipal userPrincipal) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 프로젝트"));

        Comment comment = request.toEntity(project);

        commentRepository.save(comment);
    }

    @Transactional
    public boolean deleteCommentByPassword(Long commentId, CommentDeleteRequest request, UserPrincipal userPrincipal) {
        Optional<Comment> optionalBook = commentRepository.findById(commentId);
        if (optionalBook.isPresent()) {
            Comment comment = optionalBook.get();
            if (comment.getPassword().equals(request.getPassword())) {
                commentRepository.delete(comment);
                return true;
            }
        }
        return false;
    }
}
