export default function Apply() {
  return (
    <div style={{ padding: 40, color: "#46FF2E", background: "#000", minHeight: "100vh" }}>
      <h1>◈ GLOBAL CITIZEN APPLICATION ◈</h1>
      <p>Submit your Proof of Kindness</p>

      <input placeholder="Full Name" style={inputStyle}/>
      <input placeholder="Country" style={inputStyle}/>
      <textarea placeholder="Describe your kindness action" style={inputStyle}/>
      
      <button style={btn}>SUBMIT APPLICATION</button>
    </div>
  );
}

const inputStyle = {
  width:"100%", marginBottom:10, padding:10,
  background:"#111", border:"1px solid #46FF2E", color:"#46FF2E"
}

const btn = {
  padding:12, width:"100%", background:"#46FF2E",
  color:"#000", fontWeight:"bold"
}
