package cat.cercavila.cvapi.activities.domain;

import java.util.Date;
import java.util.UUID;

public class Activity {
    private static final int COINS_REWARD = 1;
    private static final int COINS_REWARD_FIRST_DAY_MULTIPLIER = 2;
    private String id;
    private String question;
    private String type;
    private String imageKey;
    private String correctAnswer;
    private String firstIncorrectAnswer;
    private String secondIncorrectAnswer;

    public Activity() {}

    public Activity(String question, String type, String imageKey, String correctAnswer, String firstIncorrectAnswer, String secondIncorrectAnswer) {
        this.id = UUID.randomUUID().toString(); // Note: this is correct for not web applications; but as they can be created from the front, the UUID is assigned between the front and the in port of persistence, and does not get to domain.
        this.question = question;
        this.type = type;
        this.imageKey = imageKey;
        this.correctAnswer = correctAnswer;
        this.firstIncorrectAnswer = firstIncorrectAnswer;
        this.secondIncorrectAnswer = secondIncorrectAnswer;
    }

    public float getCoinsReward(Date publishedDate, Date answeredDate, String answer) {
        boolean isAnswerCorrect = answer.compareTo(correctAnswer) == 0;
        if (!isAnswerCorrect) return 0;

        boolean answeredDuringFirstDay = (answeredDate.getTime() - publishedDate.getTime()) < 86400000;
        if (answeredDuringFirstDay) return COINS_REWARD * COINS_REWARD_FIRST_DAY_MULTIPLIER;
        else return COINS_REWARD;
    }

    public String getId() { return id; }
    public String getQuestion() {return question; }
    public void setQuestion(String question) { this.question = question; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getImageKey() { return imageKey; }
    public void setImageKey(String imageKey) { this.imageKey = imageKey; }
    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
    public String getFirstIncorrectAnswer() { return firstIncorrectAnswer; }
    public void setFirstIncorrectAnswer(String firstIncorrectAnswer) { this.firstIncorrectAnswer = firstIncorrectAnswer; }
    public String getSecondIncorrectAnswer() { return secondIncorrectAnswer; }
    public void setSecondIncorrectAnswer(String secondIncorrectAnswer) { this.secondIncorrectAnswer = secondIncorrectAnswer; }

    @Override
    public String toString() {
        return "Activity{" +
                "id='" + id +
                ", question='" + question +
                ", type='" + type +
                ", imageKey='" + imageKey +
                ", correctAnswer='" + correctAnswer +
                ", firstIncorrectAnswer='" + firstIncorrectAnswer +
                ", secondIncorrectAnswer='" + secondIncorrectAnswer +
                '}';
    }
}