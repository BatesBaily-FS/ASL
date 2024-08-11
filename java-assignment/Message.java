import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Message {
	public static void main(String[] args) {
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

		String formattedDateTime = now.format(formatter);

		System.out.println("Hello ASL!");
		System.out.println("The date is: " + formattedDateTime);
	}
}
