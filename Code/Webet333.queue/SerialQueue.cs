using System;
using System.Threading.Tasks;

namespace Webet333.queue
{
    public class SerialQueue
    {
        #region Object Declaration
        readonly object _locker = new object();
        WeakReference<Task> _lastTask;
        #endregion

        /// <summary>
        /// This method is used to queue the task.
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        public Task Enqueue(Action action)
        {
            return Enqueue<object>(() => { action(); return null; });
        }

        /// <summary>
        /// This method is used to queue the task.
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        public Task<T> Enqueue<T>(Func<T> function)
        {
            lock (_locker)
            {
                Task lastTask = null;
                Task<T> resultTask = null;
                if (_lastTask != null && _lastTask.TryGetTarget(out lastTask))
                    resultTask = lastTask.ContinueWith(_ => function());
                else
                    resultTask = Task.Run(function);
                _lastTask = new WeakReference<Task>(resultTask);
                return resultTask;
            }
        }
    }
}
