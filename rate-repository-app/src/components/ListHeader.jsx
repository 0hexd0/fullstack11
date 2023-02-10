import { useState } from "react";
import { View } from "react-native";
import { Button, Menu } from "react-native-paper";

const ListHeader = ({ onChoose }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("Latest repositories");

  const openMenu = () => setVisible(true);

  const closeMenu = () => {
    setVisible(false);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>{title}</Button>}
      >
        <Menu.Item
          onPress={() => {
            closeMenu();
            setTitle("Latest repositories");
            onChoose("CREATED_AT", "DESC");
          }}
          title="Latest repositories"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            setTitle("Highest rated repositories");
            onChoose("RATING_AVERAGE", "DESC");
          }}
          title="Highest rated repositories"
        />
        <Menu.Item
          onPress={() => {
            closeMenu();
            setTitle("Lowest rated repositories");
            onChoose("RATING_AVERAGE", "ASC");
          }}
          title="Lowest rated repositories"
        />
      </Menu>
    </View>
  );
};

export default ListHeader;
