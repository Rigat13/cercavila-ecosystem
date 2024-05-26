package cat.cercavila.cvapi.activities.adapter.out.persistence;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name = "activity")
@Table(name = "activities")
public class ActivityEntity {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;
    private String question;
    private String type;
    private String imageKey;
    private String correctAnswer;
    private String firstIncorrectAnswer;
    private String secondIncorrectAnswer;

    public void setId(String id) { this.id = id; }
    public String getId() { return id; }

    public String getQuestion() {return question; }
    public void setQuestion(String name) { this.question = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getImageKey() { return imageKey; }
    public void setImageKey(String imageKey) { this.imageKey = imageKey; }
    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String webUrl) { this.correctAnswer = webUrl; }
    public String getFirstIncorrectAnswer() { return firstIncorrectAnswer; }
    public void setFirstIncorrectAnswer(String firstIncorrectAnswer) { this.firstIncorrectAnswer = firstIncorrectAnswer; }
    public String getSecondIncorrectAnswer() { return secondIncorrectAnswer; }
    public void setSecondIncorrectAnswer(String secondIncorrectAnswer) { this.secondIncorrectAnswer = secondIncorrectAnswer; }

}
