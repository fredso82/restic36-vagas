import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors } from "../../styles/colors";

interface FieldProps extends TextInputProps {
    label: string;
    placeholder?: string;
    name?: string;
    error?: string;
    senha: boolean;
  }

export default function Input({label, placeholder, name, error, senha, ...rest}:FieldProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.field} secureTextEntry={senha} placeholder={placeholder} value={name} placeholderTextColor={'#2D767F'} {...rest} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        width: "100%",
        gap: 4        
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        lineHeight: 16,
        textAlign: "left",
        color: colors.blue
    },
    field: {
        borderColor: colors.gray[800],
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        fontSize: 20,
        paddingVertical: 18,
        width: "100%",
        
    }
});
