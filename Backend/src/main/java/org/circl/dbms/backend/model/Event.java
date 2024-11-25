package org.circl.dbms.backend.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "start_date", nullable = false)
    private String startDate;

    @Column(name = "end_date", nullable = false)
    private String endDate;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "attendee_capacity", nullable = false) 
    private int attendeeCapacity;

    @Column(name = "attendees", nullable = false)
    private List<User> attendees;

    @Column(name = "attendee_count", nullable = false)
    private int attendeeCount;

    @ManyToOne
    @JoinColumn(name = "user", nullable = false)
    private User user;
}
