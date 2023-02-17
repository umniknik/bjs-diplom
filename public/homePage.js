"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => {
    const cb = (response) => {
        if (response.success) {
            location.reload();
        }
    };
    ApiConnector.logout(cb);
}



const cbcurrent = (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
};
ApiConnector.current(cbcurrent);



const ratesBoard = new RatesBoard();
const cbStocks = (response) => {
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
    console.log(response);
};
const updateRatesBoard = () => setInterval(() => ApiConnector.getStocks(cbStocks), 60000);

ApiConnector.getStocks(cbStocks);
updateRatesBoard();



const moneyManager = new MoneyManager();
const cbAddMoney = (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Баланс пополнен');
    } else {
        moneyManager.setMessage(response.success, 'Баланс НЕ пополнен');
    }
}
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, cbAddMoney)
};

const cbconversionMoney = (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Обмен совершен успешно');
    } else {
        moneyManager.setMessage(response.success, 'Обмен НЕ совершен');
    }
}
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, cbconversionMoney);
}

const cbSendMoney = (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Перевод совершен успешно');
    } else {
        moneyManager.setMessage(response.success, 'Перевод НЕ совершен');
    }
}
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, cbSendMoney)
}



const favoritesWidget = new FavoritesWidget();
const cbGetFavorites = (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
}
ApiConnector.getFavorites(cbGetFavorites)

const cbAddUser = (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response.success, 'Пользователь добавлен в список избранных');
    } else {
        favoritesWidget.setMessage(response.success, 'Пользователь НЕ добавлен в список избранных');
    }
}
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, cbAddUser);
}

const cbRemoveUser = (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response.success, 'Пользователь удалён из списка избранных');
    } else {
        favoritesWidget.setMessage(response.success, 'Пользователь НЕ удалён из списка избранных');
    }
}
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, cbRemoveUser);
}