import 'package:smartest_zone_mobile/data/models/chat_message.dart';
import 'package:uuid/uuid.dart';

class MockChatRepository {
  final List<ChatMessage> _messages = [
    ChatMessage(
      id: const Uuid().v4(),
      text: 'Hello! I am your smart home assistant. How can I help you today?',
      sender: MessageSender.ai,
      timestamp: DateTime.now().subtract(const Duration(minutes: 5)),
    ),
  ];

  Future<List<ChatMessage>> getMessages() async {
    return _messages;
  }

  Future<ChatMessage> sendMessage(String text) async {
    // Add user message
    final userMsg = ChatMessage(
      id: const Uuid().v4(),
      text: text,
      sender: MessageSender.user,
      timestamp: DateTime.now(),
    );
    _messages.add(userMsg);

    // Simulate AI response
    await Future.delayed(const Duration(seconds: 1));
    
    String responseText = "I'm not sure how to do that yet.";
    if (text.toLowerCase().contains('open')) {
      responseText = "Opening the device for you.";
    } else if (text.toLowerCase().contains('close')) {
      responseText = "Closing the device.";
    } else if (text.toLowerCase().contains('light')) {
      responseText = "Toggling the lights.";
    }

    final aiMsg = ChatMessage(
      id: const Uuid().v4(),
      text: responseText,
      sender: MessageSender.ai,
      timestamp: DateTime.now(),
    );
    _messages.add(aiMsg);
    
    return aiMsg;
  }
}
