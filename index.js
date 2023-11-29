detailScreens[0].svg = Decoration;
detailScreens[1].svg = Three;
detailScreens[2].svg = Gingerbread;
detailScreens[3].svg = House;
detailScreens[4].svg = DecorationWithClip;
detailScreens[5].svg = Star;
detailScreens[6].svg = Snowflake;
detailScreens[7].svg = Forest;
detailScreens[8].svg = DecorationWithGradient;
detailScreens[9].svg = Snowman;
detailScreens[10].svg = ThreeWithCurves;
detailScreens[11].svg = Gift;
detailScreens[12].svg = Bell;
detailScreens[13].svg = Candy;
detailScreens[14].svg = Ribbon;
detailScreens[15].svg = Bear;
detailScreens[16].svg = Text;
detailScreens[17].svg = Sleigh;
detailScreens[18].svg = RingingBell;
detailScreens[19].svg = Snowing;
detailScreens[20].svg = Background;
detailScreens[21].svg = Clock;
detailScreens[22].svg = Lights;
detailScreens[23].svg = Diagram;
detailScreens[24].svg = SnowGlobe;

function Day({ index, Component, select }) {
  const onMouseEnter = (event) => (event.currentTarget.style["z-index"] = 10);
  const onMouseLeave = (event) => {
    const target = event.currentTarget;
    // Add a delay to leave enough time for the door to close
    setTimeout(() => {
      target.style["z-index"] = 1;
    }, 1000);
  };

  return (
    <div
      class="day"
      onClick={() => select(index)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div class="cover">{index + 1}</div>
      <Component size="0.6" />
    </div>
  );
}

function App() {
  const [selection, setSelection] = React.useState(undefined);
  const DetailSVG = selection != undefined && detailScreens[selection].svg;

  return (
    <div className="App">
      <div className="grid">
        <header>
          <h1>Learn to code SVG</h1>
          <p>Click a tile to reveal an image and its source code</p>
        </header>
        <div className="block">
          <Day index={0} Component={Decoration} select={setSelection} />
          <Day index={1} Component={Three} select={setSelection} />
          <Day index={2} Component={Gingerbread} select={setSelection} />
          <Day index={3} Component={House} select={setSelection} />
          <Day index={4} Component={DecorationWithClip} select={setSelection} />
        </div>
        <div className="block">
          <Day index={5} Component={Star} select={setSelection} />
          <Day index={6} Component={Snowflake} select={setSelection} />
          <Day index={7} Component={Forest} select={setSelection} />
          <Day
            index={8}
            Component={DecorationWithGradient}
            select={setSelection}
          />
          <Day index={9} Component={Snowman} select={setSelection} />
        </div>

        <div className="block">
          <Day index={10} Component={ThreeWithCurves} select={setSelection} />
          <Day index={11} Component={Gift} select={setSelection} />
          <Day index={12} Component={Bell} select={setSelection} />
          <Day index={13} Component={Candy} select={setSelection} />
        </div>

        <div className="big-block">
          <Day index={14} Component={Ribbon} select={setSelection} />

          <div class="day twitter">
            Follow me
            <a href="https://twitter.com/HunorBorbely" target="_blank">
              @HunorBorbely
            </a>
          </div>

          <Day index={15} Component={Bear} select={setSelection} />
          <Day index={16} Component={Text} select={setSelection} />
          <Day index={17} Component={Sleigh} select={setSelection} />
          <Day index={18} Component={RingingBell} select={setSelection} />
          <Day index={19} Component={Snowing} select={setSelection} />
          <Day index={20} Component={Background} select={setSelection} />
        </div>

        <div className="small-block">
          <Day index={21} Component={Clock} select={setSelection} />
          <Day index={22} Component={Lights} select={setSelection} />
          <Day index={23} Component={Diagram} select={setSelection} />
          <Day index={24} Component={SnowGlobe} select={setSelection} />
        </div>
      </div>
      {selection != undefined && (
        <div className="detail-screen">
          <div className="close" onClick={() => setSelection(undefined)} />
          <div class="content">
            <DetailSVG size="1" />
          </div>

          <div class="details">
            <h1>{detailScreens[selection].title}</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: detailScreens[selection].description,
              }}
            />
            {detailScreens[selection].sourceCodes.map(({ type, content }) => (
              <div class="code-section" key={type}>
                <h2>{type}</h2>

                <pre class="source-code">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight(type, content).value,
                    }}
                  ></code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
