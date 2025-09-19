import React, {useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { ContactsStackNavigator } from '../ContactsStackNavigator';
import ChatsScreen from '../../screens/Chats';
import MoreScreen from '../../screens/More';
import { COLORS } from '../../constants/colors';

const Tab = createBottomTabNavigator();

// Animated Tab Component
const AnimatedTabIcon = ({ focused, children, style }) => {
  const scale = useSharedValue(focused ? 1 : 0.8);
  const opacity = 1;

  useEffect(() => {
    scale.value = withSpring(focused ? 1 : 0.8, {
      damping: 15,
      stiffness: 150,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

// Animated Indicator Component
const AnimatedIndicator = ({ focused }) => {
  const scale = useSharedValue(focused ? 1 : 0);
  const opacity = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    scale.value = withSpring(focused ? 1 : 0, {
      damping: 12,
      stiffness: 180,
      mass: 0.8,
    });
    opacity.value = withTiming(focused ? 1 : 0, {
      duration: 200,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.activeIndicator, animatedStyle]} />
  );
};

// Custom Animated Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 20,
      stiffness: 100,
    });
    opacity.value = withTiming(1, {
      duration: 400,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.tabBarStyle, animatedStyle]}>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity 
              key={route.key} 
              style={styles.tabIconContainer}
              onPress={onPress}
              activeOpacity={0.7}
            >
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused })}
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.light.textPrimary,
        tabBarInactiveTintColor: COLORS.light.textSecondary,
        tabBarShowLabel: false,
        animation: 'shift',
        animationDuration: 300,
      }}
    >
      <Tab.Screen 
        name="Contacts" 
        component={ContactsStackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              {focused ? (
                <AnimatedTabIcon focused={focused} style={styles.focusedTabContainer}>
                  <Animated.Text style={styles.tabLabel}>Contacts</Animated.Text>
                  <AnimatedIndicator focused={focused} />
                </AnimatedTabIcon>
              ) : (
                <AnimatedTabIcon focused={focused}>
                  <Image 
                    source={require('../../../assets/images/contacts.webp')} 
                    style={styles.tabIcon}
                  />
                </AnimatedTabIcon>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Chats" 
        component={ChatsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              {!focused ? (
                <AnimatedTabIcon focused={focused}>
                  <Image 
                    source={require('../../../assets/images/messages.webp')} 
                    style={styles.chatIcon} 
                  />
                </AnimatedTabIcon>
              ) : (
                <AnimatedTabIcon focused={focused} style={styles.focusedTabContainer}>
                  <Animated.Text style={styles.tabLabel}>Chats</Animated.Text>
                  <AnimatedIndicator focused={focused} />
                </AnimatedTabIcon>
              )}
            </View>
          )
        }}
      />
      <Tab.Screen 
        name="More" 
        component={MoreScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              {!focused ? (
                <AnimatedTabIcon focused={focused}>
                  <View style={styles.moreIconContainer}>
                    <View style={styles.moreDot} />
                    <View style={styles.moreDot} />
                    <View style={styles.moreDot} />
                  </View>
                </AnimatedTabIcon>
              ) : (
                <AnimatedTabIcon focused={focused} style={styles.focusedTabContainer}>
                  <Animated.Text style={styles.tabLabel}>More</Animated.Text>
                  <AnimatedIndicator focused={focused} />
                </AnimatedTabIcon>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: COLORS.light.background,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: 93,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
    paddingTop: 2,
    width: '100%',
  },
  tabBarLabelStyle: {
    fontSize: 16,
    fontFamily: 'Mulish_400Regular',
    marginTop: 4,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    flex: 1,
    paddingTop: 12,
  },
  focusedTabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 16,
    fontFamily: 'Mulish_400Regular',
    color: COLORS.light.textPrimary,
    marginBottom: 8,
  },
  inactiveTabLabel: {
    fontSize: 16,
    fontFamily: 'Mulish_400Regular',
    color: COLORS.light.textSecondary,
  },
  tabIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.light.textSecondary,
  },
  chatIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.light.textPrimary,
    marginBottom: 8,
  },
  moreIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  moreDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.light.textPrimary,
    marginHorizontal: 1,
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.light.textPrimary,
  },
});