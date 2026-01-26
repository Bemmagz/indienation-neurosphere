export default function FounderAdmin() {
  return (
    <div style={{ padding:40, background:"#000", color:"#46FF2E", minHeight:"100vh" }}>
      <h1>◈ FOUNDER COMMAND CENTER ◈</h1>

      <p>Total Citizens: 3 / 1,000,000</p>
      <p>Living Value Distributed: €300,000</p>
      <p>Donation Pool: 15%</p>

      <button style={btn}>GENERATE NEW CITIZEN</button>
      <button style={btn}>ACTIVATE DISASTER RELIEF</button>
    </div>
  );
}

const btn = {
  marginTop:15, padding:12, width:"100%",
  background:"#46FF2E", color:"#000", fontWeight:"bold"
}
