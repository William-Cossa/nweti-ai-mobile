import Colors from "@/constants/colors";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";

export default function DateOfBirthInput({ dateOfBirth, setDateOfBirth }: any) {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ marginTop: 16 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: Colors.text,
          marginBottom: 8,
        }}
      >
        Data de Nascimento *
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.surface,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: Colors.borderLight,
        }}
        onPress={() => setOpen(true)}
      >
        <Text style={{ color: dateOfBirth ? Colors.text : Colors.textLight }}>
          {dateOfBirth ? dateOfBirth.toLocaleDateString("pt-PT") : "DD/MM/AAAA"}
        </Text>
      </TouchableOpacity>

      <DatePicker
        modal
        mode="date"
        open={open}
        date={dateOfBirth || new Date()}
        maximumDate={new Date()}
        onConfirm={(date) => {
          setOpen(false);
          setDateOfBirth(date);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
}
