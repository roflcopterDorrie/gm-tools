import React from "react";
import * as d3 from "d3";
import ImageUploader from 'react-images-upload';

let drag = false;

class EncounterMap extends React.Component {

  constructor(props) {
    super(props);
    let data = this.props.getData('Encounter', this.props.id);
    if (!data.grid) {
      data.grid = {gridSize: 125, mapWidth: 2000, clearFog: false, fog: []};
    }
    this.state = {data: data, map: ''};
    this.revealToggle = true;
    document.body.classList.add('encounter-map');
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    document.getElementById('encounter-grid').addEventListener('mousedown', () => drag = true);
    document.addEventListener('mouseup', () => {drag = false; this.saveFog(this)});

    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.data.grid.mapHeight = document.getElementById('encounter-grid').offsetHeight;
    this.setState(stateCopy);
    this.drawGrid(stateCopy.data.grid);
  }

  resetGrid = () => {
    let mapWidth = parseInt(document.getElementById('mapWidth').value);
    let gridSize = parseInt(document.getElementById('gridSize').value);

    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.data.grid['mapWidth'] = mapWidth;
    stateCopy.data.grid['mapHeight'] = document.getElementById('encounter-grid').offsetHeight;
    stateCopy.data.grid['gridSize'] = gridSize;
    stateCopy.data.grid.fog = [];
    stateCopy.data.grid.clearFog = false;
    this.setState(stateCopy);
    this.drawGrid(stateCopy.data.grid);
  }

  drawGrid = (grid) => {
    let size = grid.gridSize;
    let rows = Math.ceil(grid.mapHeight / size);
    let cols = Math.ceil(grid.mapWidth / size);
    let fogs = grid.fog;
    let clearFog = grid.clearFog;

    function gridData() {
      var data = [];
      var xpos = 1;
      var ypos = 1;
      var width = size;
      var height = size;

      // iterate for rows

      for (var row = 0; row < rows; row++) {
        data.push([]);
        // iterate for cells/columns inside rows
        for (var col = 0; col < cols; col++) {
          let reveal = true;
          if (!clearFog) {
            reveal = false;
            for (const fog of fogs) {
              if (parseInt(fog.row) === row && parseInt(fog.col) === col) {
                reveal = true;
                break;
              }
            }
          }
          data[row].push({
            x: xpos,
            y: ypos,
            width: width,
            height: height,
            row: row,
            col: col,
            reveal: reveal
          })
          // increment the x position. I.e. move it over by 50 (width variable)
          xpos += width;
        }
        // reset the x position after a row is complete
        xpos = 1;
        // increment the y position for the next row. Move it down 50 (height variable)
        ypos += height;
      }
      return data;
    }

    d3.select("#encounter-grid__svg").selectAll("*").remove();

    var dataGrid = d3.select("#encounter-grid__svg")
      .attr("width",(cols * size) + "px")
      .attr("height",(rows * size) + "px");

    var row = dataGrid.selectAll(".row")
      .data(gridData)
      .enter().append("g")
      .attr("class", "row");

    row.selectAll(".square")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("class",function(d) { return d.reveal ? 'square reveal' : 'square'; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("data-reveal", function(d) { return d.reveal })
      .attr("data-row", function(d) { return d.row; })
      .attr("data-col", function(d) { return d.col; })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .on('mousedown', function(d) {
          d3.select(this).attr("class", "square reveal").attr('data-reveal', true);
      })
      .on('mouseover', function(d) {
        if (drag) {
          d3.select(this).attr("class", "square reveal").attr('data-reveal', true);
        }
      });
  }

  saveFog = () => {
    let fog = [];
    const grid = document.querySelectorAll(".square[data-reveal=true]");
    for (const gridItem of grid) {
      fog.push({
        row: gridItem.getAttribute('data-row'),
        col: gridItem.getAttribute('data-col')
      });
    }
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.data.grid.fog = fog;
    this.setState(stateCopy);
    this.props.updateData(this.props.id, 'Encounter', 'grid', stateCopy.data.grid);
  }

  toggleFog = () => {
    const grid = document.querySelectorAll(".square[data-reveal=false]");
    for (const gridItem of grid) {
      if (this.revealToggle) {
        gridItem.classList.add("tempReveal");
      } else {
        gridItem.classList.remove("tempReveal");
      }
    }
    this.revealToggle = !this.revealToggle;
  }

  clearFog = () => {
    const grid = document.querySelectorAll(".square[data-reveal=false]");
    for (const gridItem of grid) {
      gridItem.classList.add("reveal");
    }

    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.data.grid.fog = [];
    stateCopy.data.grid.clearFog = true;
    this.setState(stateCopy);
    this.props.updateData(this.props.id, 'Encounter', 'grid', stateCopy.data.grid);
  }

  hideToolbar = () => {
    document.getElementById('encounter-grid__controls').setAttribute('style', 'display: none;');
  }

  onDrop(picture, pictureDataURLs) {
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.map = pictureDataURLs;
    this.setState(stateCopy);
  }

  render() {
    return (
      <div>
        <div className="encounter-grid__controls" id='encounter-grid__controls'>
          <label>Map size</label>
          <input type="number" defaultValue={this.state.data.grid.mapWidth} id="mapWidth"/>px
          <label>Grid size</label>
          <input type="number" defaultValue={this.state.data.grid.gridSize} id="gridSize"/>px
          <input type="submit" value="Reset grid" onClick={this.resetGrid}/>
          <input type="submit" value="Toggle fog" onClick={this.toggleFog}/>
          <input type="submit" value="Clear fog" onClick={this.clearFog}/>
          <input type="submit" value="Hide overflow" onClick={()=>{document.body.classList.add('encounter-map--hide-overflow')}}/>
          <input type="submit" value="Hide controls" onClick={this.hideToolbar}/>
          <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={524288000}
            singleImage={true}
            withLabel={false}
            withIcon={false}
            buttonText='Load image'
          />
        </div>
        <div
          id="encounter-grid"
          className="encounter-grid"
        >
          <img src={this.state.map} width={this.state.data.grid.mapWidth + 'px'}/>
          <svg id="encounter-grid__svg"></svg>
        </div>
      </div>
    )
  }
}

export default EncounterMap;
