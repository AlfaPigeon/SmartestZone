import 'dart:io';
import 'package:clerk_flutter/clerk_flutter.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:smartest_zone_mobile/logic/auth/auth_bloc.dart';

class SignInScreen extends StatelessWidget {
  const SignInScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ClerkAuthBuilder(
        signedInBuilder: (context, authState) {
          // User is signed in, navigate to home
          WidgetsBinding.instance.addPostFrameCallback((_) {
            context.read<AuthBloc>().add(CheckAuthStatus()); // Sync Bloc
            context.go('/home');
          });
          return const Center(child: CircularProgressIndicator());
        },
        signedOutBuilder: (context, authState) {
          return Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.smart_toy, size: 64, color: Color(0xFF2563EB)),
                  const SizedBox(height: 24),
                  Text(
                    'SmartestZone',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Sign in to control your smart devices',
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          color: Colors.grey,
                        ),
                  ),
                  const SizedBox(height: 32),
                  // Clerk Authentication Component
                  // This will render the configured sign-in methods including Google if enabled in Clerk Dashboard
                  _buildAuthComponent(context),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildAuthComponent(BuildContext context) {
    if (!kIsWeb && (Platform.isLinux || Platform.isWindows)) {
      return Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.amber.shade100,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: Colors.amber.shade300),
        ),
        child: Column(
          children: [
            const Icon(Icons.warning_amber_rounded, color: Colors.amber, size: 48),
            const SizedBox(height: 16),
            const Text(
              'Authentication is not supported on Linux/Windows Desktop yet.',
              textAlign: TextAlign.center,
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Text(
              'Please run this app on Android, iOS, or Web to sign in.',
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                // Bypass auth for development on Linux
                context.read<AuthBloc>().add(const SignInRequested('dev@linux.com', 'password'));
                context.go('/home');
              },
              child: const Text('Bypass Auth (Dev Only)'),
            ),
          ],
        ),
      );
    }
    return const ClerkAuthentication();
  }
}
