import 'package:clerk_flutter/clerk_flutter.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:smartest_zone_mobile/core/router/app_router.dart';
import 'package:smartest_zone_mobile/core/theme/app_theme.dart';
import 'package:smartest_zone_mobile/logic/auth/auth_bloc.dart';
import 'package:smartest_zone_mobile/logic/devices/devices_bloc.dart';
import 'package:smartest_zone_mobile/logic/chat/chat_bloc.dart';
import 'package:smartest_zone_mobile/data/repositories/mock_device_repository.dart';
import 'package:smartest_zone_mobile/data/repositories/mock_chat_repository.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const SmartestZoneApp());
}

class SmartestZoneApp extends StatelessWidget {
  const SmartestZoneApp({super.key});

  @override
  Widget build(BuildContext context) {
    final deviceRepository = MockDeviceRepository();
    final chatRepository = MockChatRepository();

    return ClerkAuth(
      config: ClerkAuthConfig(
        publishableKey: 'pk_test_YXdhcmUtb3N0cmljaC02My5jbGVyay5hY2NvdW50cy5kZXYk',
        // If using Google Sign In with OAuth, you may need to provide googleClientId:
        // googleClientId: 'YOUR_GOOGLE_CLIENT_ID',
      ),
      child: MultiRepositoryProvider(
        providers: [
          RepositoryProvider.value(value: deviceRepository),
          RepositoryProvider.value(value: chatRepository),
        ],
        child: MultiBlocProvider(
          providers: [
            BlocProvider(
              create: (context) => AuthBloc(),
            ),
            BlocProvider(
              create: (context) => DevicesBloc(deviceRepository: deviceRepository)..add(LoadDevices()),
            ),
            BlocProvider(
              create: (context) => ChatBloc(chatRepository: chatRepository),
            ),
          ],
          child: MaterialApp.router(
            title: 'SmartestZone',
            theme: AppTheme.lightTheme,
            darkTheme: AppTheme.darkTheme,
            themeMode: ThemeMode.system,
            routerConfig: AppRouter.router,
            debugShowCheckedModeBanner: false,
          ),
        ),
      ),
    );
  }
}
