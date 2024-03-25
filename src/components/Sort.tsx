
function Sort (props:{onClick:(date:string) => void}) {
    return (
        <div className="sort-block">

                <span>сортировка</span>
                <label>
                    <input name="sortRadio" type='radio'
                           onChange={() => props.onClick('newest')}/>
                    Новые
                </label>
                <label>
                    <input name="sortRadio" type='radio'
                    onChange={() => props.onClick('oldest')}/>
                    Старые
                </label>

        </div>
    )
}

export default Sort