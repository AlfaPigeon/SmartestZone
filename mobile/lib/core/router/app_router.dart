import 'package:go_router/go_router.dart';
import 'package:smartest_zone_mobile/presentation/screens/auth/sign_in_screen.dart';
import 'package:smartest_zone_mobile/presentation/screens/chat/chat_screen.dart';
import 'package:smartest_zone_mobile/presentation/screens/devices/device_registration_screen.dart';
import 'package:smartest_zone_mobile/presentation/screens/home/home_screen.dart';
import 'package:smartest_zone_mobile/presentation/screens/splash_screen.dart';

class AppRouter {
  static final router = GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/sign-in',
        builder: (context, state) => const SignInScreen(),
      ),
      GoRoute(
        path: '/home',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: '/devices/register',
        builder: (context, state) => const DeviceRegistrationScreen(),
      ),
      GoRoute(
        path: '/chat',
        builder: (context, state) => const ChatScreen(),
      ),
    ],
  );
}
