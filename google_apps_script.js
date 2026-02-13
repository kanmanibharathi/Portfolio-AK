function doPost(e) {
    try {
        var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Dy_AcWdeUFbxA4KBdhFzc7A4T-UGtHztfdO2wsDRS60/edit?usp=drivesdk").getActiveSheet();

        // Extract parameters from form submission
        var name = e.parameter.name;
        var email = e.parameter.email;
        var subject = e.parameter.subject;
        var message = e.parameter.message;
        var timestamp = new Date();

        // Append to sheet
        sheet.appendRow([timestamp, name, email, subject, message]);

        // Send email notification
        var recipient = "kakash30111997@gmail.com";
        var emailSubject = "New Portfolio Message: " + subject;
        var emailBody = "You have received a new message from your portfolio website.\n\n" +
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Subject: " + subject + "\n" +
            "Message: " + message + "\n\n" +
            "Timestamp: " + timestamp;

        MailApp.sendEmail(recipient, emailSubject, emailBody);

        return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
