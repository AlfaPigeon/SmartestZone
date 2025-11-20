import 'package:equatable/equatable.dart';

enum DeviceType { light, thermostat, lock, window, curtain, other }
enum DeviceStatus { on, off, open, closed, locked, unlocked }

class Device extends Equatable {
  final String id;
  final String name;
  final DeviceType type;
  final DeviceStatus status;
  final String roomId;
  final Map<String, dynamic> properties; // e.g., temperature, brightness

  const Device({
    required this.id,
    required this.name,
    required this.type,
    required this.status,
    required this.roomId,
    this.properties = const {},
  });

  Device copyWith({
    String? id,
    String? name,
    DeviceType? type,
    DeviceStatus? status,
    String? roomId,
    Map<String, dynamic>? properties,
  }) {
    return Device(
      id: id ?? this.id,
      name: name ?? this.name,
      type: type ?? this.type,
      status: status ?? this.status,
      roomId: roomId ?? this.roomId,
      properties: properties ?? this.properties,
    );
  }

  @override
  List<Object?> get props => [id, name, type, status, roomId, properties];
}
