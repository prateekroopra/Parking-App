import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

class TimeSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    };
  }

  componentDidMount() {
    this.setState({ startTime: this.getCurrentTime(), endTime: this.getCurrentTime() })
  }

  getCurrentTime() {
    var date, TimeType, hour, minutes, seconds, fullTime;
    date = new Date();
    hour = date.getHours();
    if (hour <= 11) {
      TimeType = 'AM';
    }
    else {
      TimeType = 'PM';
    }
    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour == 0) {
      hour = 12;
    }
    minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }
    seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }
    return fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>
            Select Date and Time
          </Text>

          <View elevation={2} style={styles.mainContainer}>
            <Text style={styles.subTitle}>START</Text>

            <View style={styles.picker}>
              <DatePicker
                ref={(datepicker) => { this.startDate = datepicker; }}
                date={this.state.startDate}
                mode="date"
                style={[styles.timePickerBox, { marginLeft: 20 }]}
                placeholder="Today"
                format={'MMM D'}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderColor: 'transparent',
                    borderWidth: 0.0,
                    alignItems: 'center',
                  },
                  btnTextConfirm: {
                    color: '#7dd3d5',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  btnTextCancel: {
                    color: 'black',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  dateText: {
                    alignItems: 'center',
                    color: 'blue',
                    fontWeight: 'bold',
                    fontSize: 18,
                  },
                  placeholderText: {
                    color: 'blue',
                    fontSize: 18,
                    fontWeight: 'bold',
                  },
                }}
                onDateChange={(startDate) => { this.setState({ startDate }) }}
              />

              <View style={styles.seperator} />

              <DatePicker
                ref={(datepicker) => { this.startTime = datepicker; }}
                date={this.state.startTime}
                mode="time"
                style={styles.timePickerBox}
                placeholder="Time"
                format={'LT'}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderColor: 'transparent',
                    borderWidth: 0.0,
                    alignItems: 'center',
                  },
                  btnTextConfirm: {
                    color: '#7dd3d5',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  btnTextCancel: {
                    color: 'black',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  dateText: {
                    alignItems: 'center',
                    color: 'blue',
                    fontWeight: 'bold',
                    fontSize: 18,
                  },
                  placeholderText: {
                    color: 'blue',
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontSize: 18,
                  },
                }}
                onDateChange={(startTime) => { this.setState({ startTime }) }}
              />
            </View>
          </View>

          <View elevation={2} style={styles.mainContainer}>
            <Text style={styles.subTitle}>END</Text>

            <View style={styles.picker}>
              <DatePicker
                ref={(datepicker) => { this.endDate = datepicker; }}
                date={this.state.endDate}
                mode="date"
                style={[styles.timePickerBox, { marginLeft: 20 }]}
                placeholder="Today"
                format={'MMM D'}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderColor: 'transparent',
                    borderWidth: 0.0,
                    alignItems: 'center',
                  },
                  btnTextConfirm: {
                    color: '#7dd3d5',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  btnTextCancel: {
                    color: 'black',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  dateText: {
                    alignItems: 'center',
                    color: 'blue',
                    fontWeight: 'bold',
                    fontSize: 18,
                  },
                  placeholderText: {
                    color: 'blue',
                    fontSize: 18,
                    fontWeight: 'bold',
                  },
                }}
                onDateChange={(endDate) => { this.setState({ endDate }) }}
              />

              <View style={styles.seperator} />

              <DatePicker
                ref={(datepicker) => { this.endTime = datepicker; }}
                date={this.state.endTime}
                mode="time"
                style={styles.timePickerBox}
                placeholder="Time"
                format={'LT'}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateInput: {
                    borderColor: 'transparent',
                    borderWidth: 0.0,
                    alignItems: 'center',
                  },
                  btnTextConfirm: {
                    color: '#7dd3d5',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  btnTextCancel: {
                    color: 'black',
                    height: 30,
                    marginTop: 30,
                    marginBottom: 20,
                  },
                  dateText: {
                    alignItems: 'center',
                    color: 'blue',
                    fontWeight: 'bold',
                    fontSize: 18,
                  },
                  placeholderText: {
                    color: 'blue',
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontSize: 18,
                  },
                }}
                onDateChange={(endTime) => { this.setState({ endTime }) }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { this.props.nav.navigate('ConfirmTime') }}
          >
            <Text style={styles.buttonText}> SUBMIT </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    marginTop: 'auto',
    paddingVertical: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  mainContainer: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: "row",
  },
  subTitle: {
    fontSize: 16,
    marginTop: 10,
    width: 50,
  },
  picker: {
    alignSelf: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  seperator: {
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    height: 40,
    width: 1,
    marginTop: 0,
    marginLeft: 5,
    // marginBottom: 10,
  },
  timePickerBox: {
    color: 'black',
    width: '40%',
    // width: '100%',
  },
  cardView: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgba(67,88,102, 1)',
    fontWeight: 'bold',
    marginLeft: 30,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  topContainer: {
    height: '100%',
    margin: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 60,
    backgroundColor: 'rgba(25, 73, 165, 1)',
    borderRadius: 4,
    marginBottom: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
    paddingHorizontal: 30,
    fontSize: 14
  }
});

module.exports = TimeSummary;