import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius } from '../../constants/colors';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (text: string) => void;
    onFilterPress?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Search Workout, Trainer",
    onSearch,
    onFilterPress
}) => {
    const [searchText, setSearchText] = React.useState('');

    const handleChangeText = (text: string) => {
        setSearchText(text);
        onSearch?.(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color={Colors.textTertiary} style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.inputPlaceholder}
                    value={searchText}
                    onChangeText={handleChangeText}
                />
            </View>
            <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
                <Ionicons name="options-outline" size={20} color={Colors.textWhite} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 0,
        paddingBottom: 18
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.backgroundGray,
        borderRadius: BorderRadius.md,
        paddingHorizontal: 12,
        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: Colors.textPrimary,
    },
    filterButton: {
        width: 48,
        height: 48,
        backgroundColor: Colors.primaryLight,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
