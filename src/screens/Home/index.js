import { Link, useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../constants/colors';

const HomeScreen = () => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Top Section with Images */}
        <View style={styles.illustrationContainer}>
          {/* Right Side */}
          <View style={styles.rightContent}>
            <Image 
              source={require('../../../assets/images/home/bg-sm-circle.webp')}
              style={styles.circleRightImg}
            />
            <Image 
              source={require('../../../assets/images/home/bg-right-person.png')}
              style={styles.personRightImg}
            />
            <Image 
              source={require('../../../assets/images/home/bg-sm-typing.png')}
              style={styles.typingRightImg}
            />
          </View>
          
          {/* Left Side */}
          <View style={styles.leftContent}>
            <Image 
              source={require('../../../assets/images/home/bg-circle.webp')}
              style={styles.circleImg}
            />
            <Image 
              source={require('../../../assets/images/home/bg-left-person.png')}
              style={styles.personImg}
            />
            <Image 
              source={require('../../../assets/images/home/bg-typing.png')}
              style={styles.typingImg}
            />
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomContent}>
          <Text style={styles.title}>
            Connect easily with{'\n'}your family and friends{'\n'}over countries
          </Text>

          <View style={styles.actionContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.termsText}>Terms & Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => navigate("Verification")}
            >
              <Text style={styles.buttonText}>Start Messaging</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Mulish',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  illustrationContainer: {
    height: 300,
    position: 'relative',
    overflow: 'visible',
  },
  rightContent: {
    position: 'absolute',
    right: 12,
    top: 5,
    width: 200,
    height: 300,
  },
  leftContent: {
    position: 'absolute',
    left: -24,
    top: 60,
    width: 200,
    height: 300,
  },
  circleRightImg: {
    position: 'absolute',
    width: 100,
    height: 100,
    resizeMode: 'contain',
    right: 0,
    top: 30,
    zIndex: 1,
  },
  personRightImg: {
    position: 'absolute',
    width: 90,
    height: 100,
    resizeMode: 'contain',
    right: 21,
    top: 42,
    zIndex: 1,
  },
  typingRightImg: {
    position: 'absolute',
    width: 47,
    height: 20.33,
    resizeMode: 'contain',
    right: 65,
    top: 30, // Moved above the character
    zIndex: 3,
  },
  circleImg: {
    position: 'absolute',
    width: 117.46,
    height: 117.46,
    resizeMode: 'contain',
    left: 40,
    top: 0,
    zIndex: 1,
  },
  personImg: {
    position: 'absolute',
    width: 150,
    height: 200,
    resizeMode: 'contain',
    left: 40,
    top: 40,
    zIndex: 2,
  },
  typingImg: {
    position: 'absolute',
    width: 60,
    height: 30,
    resizeMode: 'contain',
    left: 120,
    top: 20, // Moved above the character
    zIndex: 3,
  },
  bottomContent: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'Mulish_700Bold',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: '#0F1828',
    marginBottom: 40,
    marginTop: 42,
  },
  actionContainer: {
    gap: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  termsText: {
    fontFamily: 'Mulish_600SemiBold',
    fontSize: 15,
    color: '#0F1828',
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: '#002DE3',
    paddingVertical: 16,
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Mulish_600SemiBold',
    fontSize: 16,
  },
});

export default HomeScreen;
