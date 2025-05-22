package wap.web2.server.vote.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import wap.web2.server.project.entity.Project;

@Getter
@Entity
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Boolean isOpen;

    @Column
    private Integer year;

    @Column
    private Integer semester;

    @OneToMany(mappedBy = "vote")
    private List<Project> projectList = new ArrayList<>();
}
