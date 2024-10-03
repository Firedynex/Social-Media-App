package social_media_app.backend.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.ArrayList;

@Entity
public class UserProfile {
    @Id
    private String username;

    private String favoriteQuote;
    private String bio;
    private ArrayList<String> linktree;

    public String getUsername() {
        return this.username;
    }

    public String favoriteQuote() {
        return this.favoriteQuote;
    }

    public String getBio() {
        return this.bio;
    }

    public ArrayList<String> getLinkTree() {
        return this.linktree;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setFavoriteQuote(String favoriteQuote) {
        this.favoriteQuote = favoriteQuote;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setLinkTree(ArrayList<String> linktree) {
        this.linktree = linktree;
    }
}
