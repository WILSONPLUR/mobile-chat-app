import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, Modal, FlatList } from 'react-native'
import { COLORS } from '../../../constants/colors'
import { COUNTRIES } from '../../../mock/countries'

export const CountrySelector = ({ selectedCountry, onCountrySelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCountrySelect = (country) => {
    onCountrySelect(country);
    setModalVisible(false);
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.countryItem}
      onPress={() => handleCountrySelect(item)}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.countryCode}>{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity 
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.flag}>{selectedCountry.flag}</Text>
        <Text style={styles.code}>{selectedCountry.code}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={COUNTRIES}
            renderItem={renderCountryItem}
            keyExtractor={(item) => item.code}
            style={styles.countryList}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: COLORS.light.backgroundSecondary,
    minWidth: 100,
  },
  flag: {
    fontSize: 18,
    marginRight: 8,
  },
  code: {
    fontSize: 16,
    fontFamily: 'Mulish',
    fontWeight: 400,
    color: COLORS.light.textSecondary,
    marginRight: 8,
  },
  arrow: {
    fontSize: 12,
    color: COLORS.light.textSecondary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginTop: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Mulish_600SemiBold',
    color: COLORS.light.textPrimary,
  },
  closeButton: {
    fontSize: 20,
    color: COLORS.light.textSecondary,
  },
  countryList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Mulish_400Regular',
    color: COLORS.light.textPrimary,
    marginLeft: 12,
  },
  countryCode: {
    fontSize: 16,
    fontFamily: 'Mulish_400Regular',
    color: COLORS.light.textSecondary,
  },
});
