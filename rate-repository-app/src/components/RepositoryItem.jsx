import { View, Text, StyleSheet, Image } from "react-native";

const headLineHeight = 30;

export const padding = (a, b, c, d) => ({
    paddingTop: a,
    paddingRight: b ?? a,
    paddingBottom: c ?? a,
    paddingLeft: d ?? b ?? a,
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 20,
    },
    header: {
        display: "flex",
        flexDirection: "row",
    },
    fullName: {
        fontWeight: "bold",
        lineHeight: headLineHeight,
    },
    language: {
        color: "white",
        backgroundColor: "#0366d6",
        lineHeight: headLineHeight,
        borderColor: "red",
        alignSelf: "flex-start",
        padding: 5,
        borderRadius: 4,
    },
    description: {
        marginTop: 6,
        marginBottom: 10
    },
    profile: {
        width: 50,
        height: 50,
        marginRight: 20,
    },
    infos: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: 20,
    },
    info: {
        display: "flex",
        alignItems: "center",
    },
    count: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    whiteText: {
        color: "white",
    },
});

const RepositoryItem = (props) => {
    const repository = props.repository;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.profile}
                    source={{
                        uri: repository.ownerAvatarUrl,
                    }}
                />
                <View style={{ flexShrink: 1 }}>
                    <Text style={styles.fullName}>{repository.fullName}</Text>
                    <Text style={styles.description}>{repository.description}</Text>
                    <View style={styles.language}>
                        <Text style={styles.whiteText}>{repository.language}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.infos}>
                <View style={styles.info}>
                    <Text style={styles.count}>{repository.stargazersCount}</Text>
                    <Text>Stars</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.count}>{repository.forksCount}</Text>
                    <Text>Forks</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.count}>{repository.reviewCount}</Text>
                    <Text>Reviews</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.count}>{repository.ratingAverage}</Text>
                    <Text>Rating</Text>
                </View>
            </View>
        </View>
    );
};

export default RepositoryItem;
