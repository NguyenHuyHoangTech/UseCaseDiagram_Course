import GridDnDMap from './GridDnDMap';

export default function BuildDiagramInteractive({ data, status, onComplete }: any) {
  
  if (!data?.items) return null;

  const handleStateChange = (state: { allDragged: boolean; allCorrect: boolean }) => {
    if (!state.allDragged) {
      onComplete(null);
      return;
    }

    onComplete({
      id: 'build_diagram_result',
      isCorrect: state.allCorrect,
      hint: state.allCorrect ? '' : data.hint || 'Hãy kiểm tra lại! Những Actor (tác nhân bên ngoài) phải nằm ngoài hệ thống.'
    });
  };

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
      <GridDnDMap 
         items={data.items}
         systemName={data.systemName || 'Hệ thống'}
         status={status}
         onStateChange={handleStateChange}
      />
    </div>
  );
}
