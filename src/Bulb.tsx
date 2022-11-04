const Bulb = (props:any) => {
    return(
      <mesh {...props}>
        <pointLight castShadow/>
      </mesh>
    )
}

export default Bulb;