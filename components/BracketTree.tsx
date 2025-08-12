import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';

type Player = { id: string; name: string };
type BracketTreeProps = {
  rounds: Player[][]; // e.g. [ [8 players], [4], [2], [1] ]
  width?: number;     // optional canvas width
  slotHeight?: number; // height of each slot card
  gapY?: number;        // vertical gap between slots within a round
  gapX?: number;        // horizontal gap between rounds
};

export default function BracketTree({
  rounds,
  width = Math.min(Dimensions.get('window').width, 1200),
  slotHeight = 40,
  gapY = 14,
  gapX = 40,
}: BracketTreeProps) {
  // Layout math
  const colWidths = 160; // fixed card width per column
  const cols = rounds.length;
  const canvasWidth = cols * colWidths + (cols - 1) * gapX;

  // Compute y positions: each round halves the number of items and centers them between previous items.
  const positions = useMemo(() => {
    // For round 0, stack items with gapY
    const pos: number[][] = [];
    const r0Count = rounds[0]?.length ?? 0;
    const round0: number[] = [];

    for (let i = 0; i < r0Count; i++) {
      const y = i * (slotHeight + gapY);
      round0.push(y);
    }
    pos.push(round0);

    for (let r = 1; r < cols; r++) {
      const prev = pos[r - 1];
      const currentCount = rounds[r].length;
      const curr: number[] = [];

      // Each item in round r connects 2 items in round r-1 (single-elim)
      for (let i = 0; i < currentCount; i++) {
        const childA = prev[i * 2];
        const childB = prev[i * 2 + 1];
        const center = (childA + childB) / 2;
        curr.push(center);
      }
      pos.push(curr);
    }
    return pos;
  }, [cols, rounds, slotHeight, gapY]);

  // Canvas height: enough to fit first column
  const canvasHeight =
    (rounds[0]?.length ?? 0) * slotHeight +
    ((rounds[0]?.length ?? 0) - 1) * gapY;

  return (
    <View style={[styles.wrapper, { width: canvasWidth }]}>
      {/* Lines layer */}
      <Svg
        width={canvasWidth}
        height={Math.max(canvasHeight, 120)}
        style={StyleSheet.absoluteFill}
      >
        {rounds.slice(0, -1).map((round, r) => {
          return round.map((_, i) => {
            // For round r, item i connects to round r+1 item floor(i/2)
            const fromX = r * (colWidths + gapX) + colWidths; // right edge of card
            const toX = (r + 1) * (colWidths + gapX); // left edge of next card
            const y1 = positions[r][i] + slotHeight / 2;
            const y2 = positions[r + 1][Math.floor(i / 2)] + slotHeight / 2;

            // We'll draw L-shaped join: horizontal from card, vertical to align, horizontal into next
            const midX = fromX + gapX / 2;

            return (
              <React.Fragment key={`line-${r}-${i}`}>
                {/* from card to midX */}
                <Line x1={fromX} y1={y1} x2={midX} y2={y1} stroke="silver" strokeWidth={1.5} />
                {/* vertical at midX */}
                <Line x1={midX} y1={Math.min(y1, y2)} x2={midX} y2={Math.max(y1, y2)} stroke="silver" strokeWidth={1.5} />
                {/* midX to next card */}
                <Line x1={midX} y1={y2} x2={toX} y2={y2} stroke="silver" strokeWidth={1.5} />
              </React.Fragment>
            );
          });
        })}
      </Svg>

      {/* Cards layer */}
      {rounds.map((round, r) => {
        const x = r * (colWidths + gapX);
        return (
          <View key={`col-${r}`} style={[styles.col, { left: x }]}>
            {round.map((p, i) => {
              const y = positions[r][i];
              return (
                <View key={`${p.id}-${i}`} style={[styles.slot, { top: y, height: slotHeight, width: colWidths }]}>
                  <Text style={styles.slotText} numberOfLines={1}>
                    {p.name}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
    paddingVertical: 8,
  },
  col: {
    position: 'absolute',
    top: 0,
  },
  slot: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'silver',
    backgroundColor: '#111',
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  slotText: {
    color: 'silver',
    fontSize: 14,
    fontWeight: '600',
  },
});
