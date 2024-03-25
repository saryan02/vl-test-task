
interface CategoriesProps {
    value: { [key: string]: string[] };
    onClickCategory: (value: string, type: 'priority' | 'mark') => void;
}

function Categories(props: CategoriesProps){
    const priority = [{name:"low"}, {name:"normal"}, {name:"high"}]
    const mark = [{name:"research"},{name:"design"}, {name:"development"}]

    return (
      <div className='categories-block'>
          <div className='categories-block__checkbox-menu'>

              <span>приоритет</span>
              {
                  priority.map((priority, i )=> (
                      <label key={i}>
                          <input name="priorityBox" type='checkbox'  checked={props.value.priority.includes(priority.name)} // Проверяем, включена ли категория
                                 onChange={() => props.onClickCategory(priority.name, 'priority')}/>{priority.name}

                      </label>
                  ))
              }
          </div>

          <div className='categories-block__checkbox-menu'>
              <span>отметка</span>
              {
                  mark.map((mark,i )=> (
                      <label key={i}>
                          <input name="markBox" type='checkbox'
                                 checked={props.value.mark.includes(mark.name)}
                          onChange={() => props.onClickCategory(mark.name, 'mark')}/>{mark.name}
                      </label>

                  ))
              }
          </div>
      </div>
    )
}

export default Categories