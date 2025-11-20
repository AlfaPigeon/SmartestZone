import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:smartest_zone_mobile/data/models/device.dart';
import 'package:smartest_zone_mobile/logic/devices/devices_bloc.dart';

class DevicesScreen extends StatelessWidget {
  const DevicesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<DevicesBloc, DevicesState>(
      builder: (context, state) {
        if (state is DevicesLoading) {
          return const Center(child: CircularProgressIndicator());
        } else if (state is DevicesLoaded) {
          if (state.devices.isEmpty) {
            return const Center(child: Text('No devices found. Add one!'));
          }
          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: state.devices.length,
            itemBuilder: (context, index) {
              final device = state.devices[index];
              return DeviceCard(device: device);
            },
          );
        } else if (state is DevicesError) {
          return Center(child: Text('Error: ${state.message}'));
        }
        return const Center(child: Text('Something went wrong'));
      },
    );
  }
}

class DeviceCard extends StatelessWidget {
  final Device device;

  const DeviceCard({super.key, required this.device});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: _getDeviceColor(device.status).withValues(alpha: 0.1),
          child: Icon(
            _getDeviceIcon(device.type),
            color: _getDeviceColor(device.status),
          ),
        ),
        title: Text(device.name),
        subtitle: Text(device.roomId),
        trailing: Switch(
          value: _isDeviceActive(device.status),
          onChanged: (value) {
            context.read<DevicesBloc>().add(
                  ToggleDeviceStatus(device.id, device.status),
                );
          },
        ),
      ),
    );
  }

  IconData _getDeviceIcon(DeviceType type) {
    switch (type) {
      case DeviceType.light: return Icons.lightbulb;
      case DeviceType.thermostat: return Icons.thermostat;
      case DeviceType.lock: return Icons.lock;
      case DeviceType.window: return Icons.window;
      case DeviceType.curtain: return Icons.curtains;
      default: return Icons.device_unknown;
    }
  }

  Color _getDeviceColor(DeviceStatus status) {
    switch (status) {
      case DeviceStatus.on:
      case DeviceStatus.open:
      case DeviceStatus.unlocked:
        return Colors.blue;
      default:
        return Colors.grey;
    }
  }

  bool _isDeviceActive(DeviceStatus status) {
    return status == DeviceStatus.on || 
           status == DeviceStatus.open || 
           status == DeviceStatus.unlocked;
  }
}
