package org.circl.dbms.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Text post data transfer object class.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TextPostDto {
    private Long id;
    private String email;
    private String content;
    private int likeCounter;
    private String firstName;
    private String lastName;
}
