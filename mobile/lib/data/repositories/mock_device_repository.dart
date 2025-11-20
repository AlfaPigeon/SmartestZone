import 'package:smartest_zone_mobile/data/models/device.dart';
import 'package:uuid/uuid.dart';

class MockDeviceRepository {
  final List<Device> _devices = [
    const Device(
      id: '1',
      name: 'Living Room Light',
      type: DeviceType.light,
      status: DeviceStatus.off,
      roomId: 'living_room',
    ),
    const Device(
      id: '2',
      name: 'Thermostat',
      type: DeviceType.thermostat,
      status: DeviceStatus.on,
      roomId: 'living_room',
      properties: {'temperature': 22},
    ),
    const Device(
      id: '3',
      name: 'Front Door',
      type: DeviceType.lock,
      status: DeviceStatus.locked,
      roomId: 'entrance',
    ),
    const Device(
      id: '4',
      name: 'Bedroom Window',
      type: DeviceType.window,
      status: DeviceStatus.closed,
      roomId: 'bedroom',
    ),
  ];

  Future<List<Device>> getDevices() async {
    await Future.delayed(const Duration(milliseconds: 800));
    return _devices;
  }

  Future<void> addDevice(Device device) async {
    await Future.delayed(const Duration(milliseconds: 500));
    _devices.add(device);
  }

  Future<void> updateDeviceStatus(String id, DeviceStatus status) async {
    await Future.delayed(const Duration(milliseconds: 300));
    final index = _devices.indexWhere((d) => d.id == id);
    if (index != -1) {
      _devices[index] = _devices[index].copyWith(status: status);
    }
  }
  
  Future<void> registerDevice(String code) async {
    // Mock registration logic
    await Future.delayed(const Duration(seconds: 2));
    if (code == 'INVALID') {
      throw Exception('Invalid device code');
    }
    final newDevice = Device(
      id: const Uuid().v4(),
      name: 'New Device ${code.substring(0, 4)}',
      type: DeviceType.other,
      status: DeviceStatus.off,
      roomId: 'unknown',
    );
    _devices.add(newDevice);
  }
}
