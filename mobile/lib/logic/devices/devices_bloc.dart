import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:smartest_zone_mobile/data/models/device.dart';
import 'package:smartest_zone_mobile/data/repositories/mock_device_repository.dart';

// Events
abstract class DevicesEvent extends Equatable {
  const DevicesEvent();
  @override
  List<Object> get props => [];
}

class LoadDevices extends DevicesEvent {}

class ToggleDeviceStatus extends DevicesEvent {
  final String deviceId;
  final DeviceStatus currentStatus;
  const ToggleDeviceStatus(this.deviceId, this.currentStatus);
}

class RegisterDevice extends DevicesEvent {
  final String code;
  const RegisterDevice(this.code);
}

// States
abstract class DevicesState extends Equatable {
  const DevicesState();
  @override
  List<Object> get props => [];
}

class DevicesInitial extends DevicesState {}
class DevicesLoading extends DevicesState {}
class DevicesLoaded extends DevicesState {
  final List<Device> devices;
  const DevicesLoaded(this.devices);
  @override
  List<Object> get props => [devices];
}
class DevicesError extends DevicesState {
  final String message;
  const DevicesError(this.message);
}

// Bloc
class DevicesBloc extends Bloc<DevicesEvent, DevicesState> {
  final MockDeviceRepository deviceRepository;

  DevicesBloc({required this.deviceRepository}) : super(DevicesInitial()) {
    on<LoadDevices>(_onLoadDevices);
    on<ToggleDeviceStatus>(_onToggleDeviceStatus);
    on<RegisterDevice>(_onRegisterDevice);
  }

  Future<void> _onLoadDevices(LoadDevices event, Emitter<DevicesState> emit) async {
    emit(DevicesLoading());
    try {
      final devices = await deviceRepository.getDevices();
      emit(DevicesLoaded(List.from(devices)));
    } catch (e) {
      emit(DevicesError(e.toString()));
    }
  }

  Future<void> _onToggleDeviceStatus(ToggleDeviceStatus event, Emitter<DevicesState> emit) async {
    // Optimistic update could be done here, but for simplicity we'll reload
    try {
      DeviceStatus newStatus;
      // Simple toggle logic for demo
      switch (event.currentStatus) {
        case DeviceStatus.on: newStatus = DeviceStatus.off; break;
        case DeviceStatus.off: newStatus = DeviceStatus.on; break;
        case DeviceStatus.open: newStatus = DeviceStatus.closed; break;
        case DeviceStatus.closed: newStatus = DeviceStatus.open; break;
        case DeviceStatus.locked: newStatus = DeviceStatus.unlocked; break;
        case DeviceStatus.unlocked: newStatus = DeviceStatus.locked; break;
      }
      
      await deviceRepository.updateDeviceStatus(event.deviceId, newStatus);
      add(LoadDevices());
    } catch (e) {
      emit(DevicesError(e.toString()));
    }
  }

  Future<void> _onRegisterDevice(RegisterDevice event, Emitter<DevicesState> emit) async {
    emit(DevicesLoading());
    try {
      await deviceRepository.registerDevice(event.code);
      add(LoadDevices());
    } catch (e) {
      emit(DevicesError(e.toString()));
    }
  }
}
