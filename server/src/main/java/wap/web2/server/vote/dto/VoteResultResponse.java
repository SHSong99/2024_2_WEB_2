package wap.web2.server.vote.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import wap.web2.server.project.entity.Project;

@Getter
@Builder
@AllArgsConstructor
public class VoteResultResponse {

    private String projectName;

    private String projectSummary;

    private String thumbnail;

    private long voteCount;

    private double voteRate;

    public static VoteResultResponse from(Project project) {
        return VoteResultResponse.builder()
                .projectName(project.getTitle())
                .projectSummary(project.getSummary())
                .thumbnail(project.getThumbnail())
                .voteCount(project.getVoteCount())
                .build();
    }

    public void calcVoteRate(long totalVoted) {
        if (totalVoted == 0) {
            voteRate = 0.0;
            return;
        }
        double rate = (double) voteCount / totalVoted * 100;
        voteRate = Math.round(rate * 10) / 10.0;
    }
}
