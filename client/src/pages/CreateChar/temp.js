
const Temp = (props) => {
    <div>
        {
            Object.keys(templates).map(template_name => {
                return (
                    <div>
                        <div>{template_name}</div>
                        {
                            templates[template_name].items.map(item => {
                                return (<div>{item}</div>)
                            })
                        }
                    </div>
                )
            })
        }
    </div>
}