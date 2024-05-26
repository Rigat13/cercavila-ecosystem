package cat.cercavila.cvapi.activities.application.port.in.list;

public record ActivityListing(String id, String question, String type, String imageKey, byte[] image, String correctAnswer, String firstIncorrectAnswer, String secondIncorrectAnswer) {
    public ActivityListing(String id, String question, String type, String imageKey, String correctAnswer, String firstIncorrectAnswer, String secondIncorrectAnswer) {
        this(id, question, type, imageKey, null, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer);
    }
}