
interface PageHeaderProps
{
    header:string
}

export function PageHeader({header}:PageHeaderProps){
    return (
        <h1 className="border-bottom">{header}</h1>
    )
}
