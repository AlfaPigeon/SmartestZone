import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:smartest_zone_mobile/logic/devices/devices_bloc.dart';

class DeviceRegistrationScreen extends StatefulWidget {
  const DeviceRegistrationScreen({super.key});

  @override
  State<DeviceRegistrationScreen> createState() => _DeviceRegistrationScreenState();
}

class _DeviceRegistrationScreenState extends State<DeviceRegistrationScreen> {
  final _codeController = TextEditingController();
  bool _isScanning = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Register Device'),
      ),
      body: Column(
        children: [
          Expanded(
            flex: 2,
            child: _isScanning
                ? MobileScanner(
                    onDetect: (capture) {
                      final List<Barcode> barcodes = capture.barcodes;
                      for (final barcode in barcodes) {
                        if (barcode.rawValue != null) {
                          _registerDevice(barcode.rawValue!);
                          break; // Only register one
                        }
                      }
                    },
                  )
                : Container(
                    color: Colors.black,
                    child: const Center(
                      child: Icon(Icons.camera_alt_outlined, color: Colors.white, size: 64),
                    ),
                  ),
          ),
          Expanded(
            flex: 1,
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    'Scan QR Code or Enter Code',
                    style: Theme.of(context).textTheme.titleLarge,
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _codeController,
                          decoration: const InputDecoration(
                            labelText: 'Device Code',
                            hintText: 'XXXX-XXXX',
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      ElevatedButton(
                        onPressed: () {
                          if (_codeController.text.isNotEmpty) {
                            _registerDevice(_codeController.text);
                          }
                        },
                        child: const Text('Add'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  TextButton(
                    onPressed: () {
                      setState(() {
                        _isScanning = !_isScanning;
                      });
                    },
                    child: Text(_isScanning ? 'Stop Scanning' : 'Start Scanning'),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _registerDevice(String code) {
    // Debounce or check if already processing could be added here
    context.read<DevicesBloc>().add(RegisterDevice(code));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Registering device: $code')),
    );
    context.pop();
  }
}
