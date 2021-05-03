import React from 'react'

function NeumorphicForm() {
    return (
      <div>
        <form className="price-series">
          <label>
            <input type="text" placeholder="Enter Stock prices (use commas)" />
          </label>

          <label>
            <input type="hidden" className="answer-box" />
          </label>

          <button type="button">Max Profit</button>
        </form>
      </div>
    );
}

export default NeumorphicForm

