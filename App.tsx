import { Button, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, InformationCircleIcon, PlusCircleIcon } from "react-native-heroicons/outline";

export default function App() {
  const Wscreen = useWindowDimensions().width
  const info = [{ name: 'Available', back: 'white', color: 'lawngreen' }, { name: 'Available  only for women', back: 'white', color: 'pink' }, { name: 'Selected by you', back: 'lawngreen', color: 'lightgray' }, { name: 'Booked by others', back: 'lightgray', color: 'black' }, { name: 'Booked by Female passengers', back: 'lightgray', color: 'pink' }]

  const [selectedSeat, setSelectedSeat] = useState(new Set());
  const [showPrice, setShowPrice] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)


  useEffect(() => {
    Array.from(selectedSeat).map(it => (setTotalPrice(totalPrice + checkPrice(it))))
  }, [selectedSeat])
  const Upper = () => {
    const rows = 5;
    const columns = 4;

    const pattern = [];

    for (let i = 0; i < rows; i++) {
      const rowContent = [];
      for (let j = 0; j < columns; j++) {
        if (j == 1)
          rowContent.push(
            <View key={i} style={{ width: 60, height: 80, margin: 10, }}>

            </View>
          );
        else
          rowContent.push(
            <Pressable key={i} style={{ width: 60, height: 80, borderColor: 'green', borderWidth: 1, margin: 10, justifyContent: 'flex-end', alignItems: 'center', }}>
              <View style={{ width: 30, height: 7, borderWidth: 1, margin: 10, }}></View>
            </Pressable>
          );
      }
      pattern.push(rowContent);
    }

    return pattern;
  };
  const Lower = () => {
    const rectangles = [];

    for (let i = 0; i < 15; i++) {

      rectangles.push(
        <View key={i} style={{ width: 60, height: 80, borderColor: 'green', borderWidth: 1, margin: 10, marginRight: i % 3 == 0 ? 50 : 0, elevation: 4, shadowColor: 'black', shadowOffset: { width: 10, height: 0 }, justifyContent: 'flex-end', alignItems: 'center', }}>
          <View style={{ width: 30, height: 7, borderWidth: 1, margin: 10, elevation: 2, shadowColor: 'black', shadowOffset: { width: 1, height: 1 }, shadowOpacity: .5, }}></View>
        </View>
      );
    }

    return rectangles;
  };

  const checkBooked = (no) => {
    return ['L5', 'U5', 'L6', 'U6', 'L7', 'U7', 'L8', 'U8', 'L13', 'U13'].includes(no)
  }
  const checkWomenSeat = (no) => {
    return ['L3', 'U3', 'L4', 'U4', 'L8', 'U8', 'L9', 'U9'].includes(no)
  }
  const checkSelectedSeat = (no) => {
    return selectedSeat.has(no);
  }
  const checkPrice = (no) => {
    if (['L13', 'U13', 'L14', 'U14', 'L15', 'U15', 'L2', 'L11'].includes(no))
      return 30;
    else
      return 50;
  }


  const generatePattern = (deck) => {
    const rows = 5;
    const columns = 3;

    const pattern = [];

    for (let i = 1; i <= rows; i++) {
      const rowContent = [];
      for (let j = 1; j <= columns; j++) {
        let seat = deck + (((i - 1) * 3) + j).toString();
        rowContent.push({
          seatNo: seat,
          booked: checkBooked(seat),
          womenSeat: checkWomenSeat(seat),
          selectedSeat: checkSelectedSeat(seat),
          price: checkPrice(seat)
        });
      }
      pattern.push(rowContent);
    }

    return pattern;
  };

  const handleSeatPress = (seatNo) => {

    const updatedSelectedSeat = new Set(selectedSeat);
    if (updatedSelectedSeat.has(seatNo)) {
      updatedSelectedSeat.delete(seatNo);
    } else {
      updatedSelectedSeat.add(seatNo);
    }
    if (!checkBooked(seatNo))
      setSelectedSeat(updatedSelectedSeat);
  };

  const Grid = ({ deck }) => {
    return (
      <View style={{ marginTop: 10, flexDirection: 'column', gap: 15, alignItems: 'center', width: useWindowDimensions().width * .8 }}>
        {generatePattern(deck).map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row', }} >
            {row.map((cell, index) => (
              <Pressable key={index} onLongPress={() => setShowPrice((deck + (((rowIndex) * 3) + index + 1).toString()))} onPressOut={() => setShowPrice('')} onPress={() => handleSeatPress(cell.seatNo)} style={{ width: 60, height: 80, backgroundColor: cell.booked ? 'lightgray' : cell.selectedSeat ? 'lawngreen' : 'white', borderColor: cell.womenSeat ? 'pink' : 'green', marginRight: index == 0 ? 80 : 10, borderWidth: 1, elevation: 4, shadowColor: 'black', shadowOffset: { width: 10, height: 0 }, justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}>
                {(showPrice == cell.seatNo) && <Text style={{ position: 'absolute', top: 0, fontSize: 18 }}>₹{cell.price}</Text>}
                <View style={{ width: 30, height: 7, borderWidth: 1, borderColor: cell.womenSeat ? 'pink' : 'green', margin: 10, elevation: 2, shadowColor: 'black', shadowOffset: { width: 1, height: 1 }, shadowOpacity: .5, }}></View>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: 'white' }}>
      <View style={{}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, marginBottom: 15, paddingHorizontal: 5 }}>
          <ArrowLeftIcon color={'black'} />
          <Text style={{ fontSize: 22, marginLeft: 15 }}>Bus Travels</Text>
        </View>
        <ScrollView horizontal style={{paddingHorizontal:5}}>
          <View style={{ borderWidth: 1, width: useWindowDimensions().width * .55, }}>
            <View style={{ borderBottomWidth: 1,  paddingVertical: 3,flexDirection:'row',alignItems:'center'}}>

            <Text style={{ fontSize: 17, }}>Know about seat types </Text>
            <InformationCircleIcon color={'black'}/>
            </View>
            {info.map((item, index) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View key={index} style={{ width: 30, height: 50, backgroundColor: item.back, borderColor: item.color, borderWidth: 1, margin: 10, justifyContent: 'flex-end', alignItems: 'center' }}>
                  <View style={{ width: 20, height: 6, borderWidth: 1, borderColor: item.color, borderRadius: 2, margin: 10, }}></View>
                </View>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
              </View>
            ))}
          </View>

          {/* lower deck */}
          <View style={{ borderWidth: 1, marginHorizontal: 15 }}>
            <Text style={{ borderBottomWidth: 1, fontSize: 25, paddingVertical: 3, textAlign: 'center' }}>Lower deck</Text>
            <Grid deck={'L'} />
          </View>

          {/* upper deck */}
          <View style={{ borderWidth: 1 }}>
            <Text style={{ borderBottomWidth: 1, fontSize: 25, paddingVertical: 3, textAlign: 'center' }}>Upper deck</Text>
            <Grid deck={'U'} />
          </View>
        </ScrollView>
      </View>

      <View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 15, borderWidth: 2, borderColor: 'gray', elevation: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, fontWeight: '700' }}>{selectedSeat.size} seat |</Text>
            <ScrollView horizontal style={{ width: Wscreen * .5 }}>
              {Array.from(selectedSeat).map((seat, index) => (
                <Text key={index} style={{ marginHorizontal: 2, fontSize: 17, fontWeight: '700' }}>{seat},</Text>
              ))}
            </ScrollView>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 17, fontWeight: '700' }}>₹{totalPrice}</Text>
            <PlusCircleIcon color={'black'} />
          </View>
        </View>
        <Button title='Continue' color={'mediumslateblue'} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'red',
  },
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    margin: 5,
  },
});
