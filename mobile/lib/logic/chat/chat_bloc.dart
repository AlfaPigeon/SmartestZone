import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:smartest_zone_mobile/data/models/chat_message.dart';
import 'package:smartest_zone_mobile/data/repositories/mock_chat_repository.dart';

// Events
abstract class ChatEvent extends Equatable {
  const ChatEvent();
  @override
  List<Object> get props => [];
}

class LoadChat extends ChatEvent {}

class SendMessage extends ChatEvent {
  final String text;
  const SendMessage(this.text);
}

// States
abstract class ChatState extends Equatable {
  const ChatState();
  @override
  List<Object> get props => [];
}

class ChatInitial extends ChatState {}
class ChatLoading extends ChatState {}
class ChatLoaded extends ChatState {
  final List<ChatMessage> messages;
  const ChatLoaded(this.messages);
  @override
  List<Object> get props => [messages];
}
class ChatError extends ChatState {
  final String message;
  const ChatError(this.message);
}

// Bloc
class ChatBloc extends Bloc<ChatEvent, ChatState> {
  final MockChatRepository chatRepository;

  ChatBloc({required this.chatRepository}) : super(ChatInitial()) {
    on<LoadChat>(_onLoadChat);
    on<SendMessage>(_onSendMessage);
  }

  Future<void> _onLoadChat(LoadChat event, Emitter<ChatState> emit) async {
    emit(ChatLoading());
    try {
      final messages = await chatRepository.getMessages();
      emit(ChatLoaded(List.from(messages)));
    } catch (e) {
      emit(ChatError(e.toString()));
    }
  }

  Future<void> _onSendMessage(SendMessage event, Emitter<ChatState> emit) async {
    final currentState = state;
    if (currentState is ChatLoaded) {
      // Optimistic update or just wait for response
      // Let's wait for response for simplicity in this mock
      // But we should probably show the user message immediately
      
      // Re-emitting loaded with user message immediately would be better UX
      // But for now let's just call repository
      
      try {
        await chatRepository.sendMessage(event.text);
        final messages = await chatRepository.getMessages();
        emit(ChatLoaded(List.from(messages)));
      } catch (e) {
        emit(ChatError(e.toString()));
      }
    }
  }
}
