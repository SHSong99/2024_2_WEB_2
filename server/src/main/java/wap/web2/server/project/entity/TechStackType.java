package wap.web2.server.project.entity;

import lombok.Getter;

@Getter
public enum TechStackType {
    FRONT("Front"),
    BACK("Back"),
    APP("App"),
    DEPLOYMENT("Deployment"),
    GAME("Game"),
    AI("AI");

    private final String type;

    TechStackType(String type) {
        this.type = type;
    }
}
