package social_media_app.backend.backend.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;



@Entity
public class Achievements {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long achievement_id;
    private String achievement_name;
    private String description;
    private Date start_date;
    private Date end_date;

    public Achievements() {}

    public Long getAchievement_id() {
        return achievement_id;
    }

    public void setAchievement_id(Long achievement_id) {
        this.achievement_id = achievement_id;
    }   

    public String getAchievement_name() {
        return achievement_name;
    }

    public void setAchievement_name(String achievement_name) {
        this.achievement_name = achievement_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }





}
