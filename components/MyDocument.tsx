"use client";

import React, { useMemo } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define the styles using StyleSheet
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textDecoration: "underline",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  listItem: {
    marginLeft: 10,
  },
  content: {
    marginBottom: 5,
  },
  table: {
    display: "flex",
    width: "auto",
    margin: "10px 0",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
  },
  tableCell: {
    fontSize: 12,
  },
});

// Define the type for data items
type DataItem = {
  type: string;
  position?: number;
  artist?: string;
  title?: string;
  totalGross?: string;
  weekendGross?: string;
  weeksReleased?: number;
  [key: string]: any; // Allow for additional fields
};

// Function to chunk data into manageable pieces
const chunkArray = (array: DataItem[], size: number): DataItem[][] => {
  return array.reduce((acc: DataItem[][], _: DataItem, i: number) => {
    if (i % size === 0) acc.push(array.slice(i, i + size));
    return acc;
  }, []);
};

// Function to format and render content based on the type of data
const formatContent = (items: DataItem[]): JSX.Element => {
  const billboardItems = useMemo(
    () => items.filter((item: DataItem) => item.type === "billboard"),
    [items]
  );

  const newMusicItems = useMemo(
    () => items.filter((item: DataItem) => item.type === "new_music"),
    [items]
  );

  const topSongsItems = useMemo(
    () => items.filter((item: DataItem) => item.type === "top_songs"),
    [items]
  );

  const weeklyBoxOfficeItems = useMemo(
    () => items.filter((item: DataItem) => item.type === "weekly_box_office"),
    [items]
  );

  // Function to render a table with data
  const renderTable = (
    title: string,
    data: DataItem[],
    columns: string[]
  ): JSX.Element[] => {
    const chunkedData = chunkArray(data, 10); // Chunk data into smaller pieces
    return chunkedData.map((chunk, index) => (
      <View key={title + index}>
        <Text style={styles.subheading}>
          {title} - Page {index + 1}
        </Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            {columns.map((col) => (
              <View key={col} style={styles.tableCol}>
                <Text style={[styles.tableCell, { fontWeight: "bold" }]}>
                  {col}
                </Text>
              </View>
            ))}
          </View>
          {chunk.map((item) => (
            <View style={styles.tableRow} key={item.position}>
              {columns.map((col) => (
                <View key={col} style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item[col]}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    ));
  };

  // Return JSX with all the formatted content
  return (
    <View>
      {billboardItems.length > 0 &&
        renderTable("BILLBOARD", billboardItems, [
          "position",
          "artist",
          "title",
        ])}
      {newMusicItems.length > 0 &&
        renderTable("NEW MUSIC", newMusicItems, [
          "position",
          "artist",
          "title",
        ])}
      {topSongsItems.length > 0 &&
        renderTable("TOP SONGS", topSongsItems, [
          "position",
          "artist",
          "title",
        ])}
      {weeklyBoxOfficeItems.length > 0 &&
        renderTable("WEEKLY BOX OFFICE", weeklyBoxOfficeItems, [
          "position",
          "title",
          "totalGross",
          "weekendGross",
          "weeksReleased",
        ])}
      {items
        .filter(
          (item) =>
            item.type !== "billboard" &&
            item.type !== "new_music" &&
            item.type !== "top_songs" &&
            item.type !== "weekly_box_office"
        )
        .map((item, index) => (
          <View key={index}>
            <Text style={styles.subheading}>{`${
              index + 1
            }. ${item.type.toUpperCase()}`}</Text>
            {Object.keys(item).map((key, idx) => (
              <Text key={idx} style={styles.listItem}>
                <Text style={{ fontWeight: "bold" }}>{`${key}: `}</Text>
                <Text>{JSON.stringify(item[key], null, 2)}</Text>
              </Text>
            ))}
            <View style={styles.divider} />
          </View>
        ))}
    </View>
  );
};

// Main component that renders the document
const MyDocument: React.FC<{ uniqueId: string; data: DataItem[] }> = ({
  uniqueId,
  data,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Firestore Data Summary</Text>
        <View style={styles.content}>{formatContent(data)}</View>
      </View>
      <View style={styles.section}>
        <Text>Unique ID: {uniqueId}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
