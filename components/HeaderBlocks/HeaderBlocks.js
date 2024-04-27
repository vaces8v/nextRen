import style from './HeaderBlocks.module.css'

export const HeaderBlocks = ({title}) => {
	return (
		<>
			<div className={style.blockHeader}>
				<div className={style.contenBlcok}>{title}</div>
			</div>
		</>
	)
}
